import { mkdir, readFile, readdir, writeFile } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

export type V2AdminSnapshot = {
  version: 1;
  exportedAt: string;
  counts: Record<string, number>;
  data: {
    pageSections: Array<Record<string, unknown>>;
    projects: Array<Record<string, unknown>>;
    projectTranslations: Array<Record<string, unknown>>;
    projectImages: Array<Record<string, unknown>>;
    siteSettings: Array<Record<string, unknown>>;
    availabilityRules: Array<Record<string, unknown>>;
    availabilityExceptions: Array<Record<string, unknown>>;
    assets: Array<Record<string, unknown>>;
    adminUsers: Array<Record<string, unknown>>;
  };
};

const SNAPSHOT_VERSION = 1;
const SNAPSHOT_DIR = path.join(process.cwd(), 'snapshots');

function toIso(value: Date | null | undefined) {
  return value ? value.toISOString() : null;
}

function toDate(value: unknown) {
  if (typeof value !== 'string' || value.length === 0) {
    return null;
  }

  return new Date(value);
}

function timestampForFilename(date = new Date()) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

export function getDefaultSnapshotPath(date = new Date()) {
  return path.join(SNAPSHOT_DIR, `admin-snapshot-${timestampForFilename(date)}.json`);
}

export async function findLatestSnapshotPath() {
  const files = await readdir(SNAPSHOT_DIR);
  const candidates = files
    .filter((file) => file.startsWith('admin-snapshot-') && file.endsWith('.json'))
    .sort()
    .reverse();

  if (candidates.length === 0) {
    throw new Error('No admin snapshots found in snapshots/.');
  }

  return path.join(SNAPSHOT_DIR, candidates[0]);
}

export async function exportV2AdminSnapshot(outputPath = getDefaultSnapshotPath()) {
  const [
    pageSections,
    projects,
    projectTranslations,
    projectImages,
    siteSettings,
    availabilityRules,
    availabilityExceptions,
    assets,
    adminUsers,
  ] = await Promise.all([
    db.v2PageSection.findMany({ orderBy: [{ pageKey: 'asc' }, { locale: 'asc' }, { displayOrder: 'asc' }] }),
    db.v2Project.findMany({ orderBy: [{ sortOrder: 'asc' }, { slug: 'asc' }] }),
    db.v2ProjectTranslation.findMany({ orderBy: [{ projectId: 'asc' }, { locale: 'asc' }] }),
    db.v2ProjectImage.findMany({ orderBy: [{ projectId: 'asc' }, { sortOrder: 'asc' }] }),
    db.v2SiteSetting.findMany({ orderBy: [{ category: 'asc' }, { key: 'asc' }] }),
    db.v2AvailabilityRule.findMany({ orderBy: { dayOfWeek: 'asc' } }),
    db.v2AvailabilityException.findMany({ orderBy: { date: 'asc' } }),
    db.v2Asset.findMany({ orderBy: [{ createdAt: 'asc' }, { filename: 'asc' }] }),
    db.v2AdminUser.findMany({
      where: { isActive: true },
      orderBy: { email: 'asc' },
    }),
  ]);

  const snapshot: V2AdminSnapshot = {
    version: SNAPSHOT_VERSION,
    exportedAt: new Date().toISOString(),
    counts: {
      pageSections: pageSections.length,
      projects: projects.length,
      projectTranslations: projectTranslations.length,
      projectImages: projectImages.length,
      siteSettings: siteSettings.length,
      availabilityRules: availabilityRules.length,
      availabilityExceptions: availabilityExceptions.length,
      assets: assets.length,
      adminUsers: adminUsers.length,
    },
    data: {
      pageSections: pageSections.map((section) => ({
        ...section,
        createdAt: section.createdAt.toISOString(),
        updatedAt: section.updatedAt.toISOString(),
      })),
      projects: projects.map((project) => ({
        ...project,
        createdAt: project.createdAt.toISOString(),
        updatedAt: project.updatedAt.toISOString(),
      })),
      projectTranslations: projectTranslations.map((translation) => ({
        ...translation,
        createdAt: translation.createdAt.toISOString(),
        updatedAt: translation.updatedAt.toISOString(),
      })),
      projectImages: projectImages.map((image) => ({
        ...image,
        createdAt: image.createdAt.toISOString(),
      })),
      siteSettings: siteSettings.map((setting) => ({
        ...setting,
        createdAt: setting.createdAt.toISOString(),
        updatedAt: setting.updatedAt.toISOString(),
      })),
      availabilityRules: availabilityRules.map((rule) => ({
        ...rule,
        createdAt: rule.createdAt.toISOString(),
        updatedAt: rule.updatedAt.toISOString(),
      })),
      availabilityExceptions: availabilityExceptions.map((exception) => ({
        ...exception,
        date: exception.date.toISOString(),
        createdAt: exception.createdAt.toISOString(),
        updatedAt: exception.updatedAt.toISOString(),
      })),
      assets: assets.map((asset) => ({
        ...asset,
        createdAt: asset.createdAt.toISOString(),
        updatedAt: asset.updatedAt.toISOString(),
      })),
      adminUsers: adminUsers.map((user) => ({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        passwordHash: user.passwordHash,
        isActive: user.isActive,
        lastLoginAt: toIso(user.lastLoginAt),
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      })),
    },
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, 'utf8');

  return {
    outputPath,
    snapshot,
  };
}

export async function loadV2AdminSnapshot(snapshotPath: string) {
  const raw = await readFile(snapshotPath, 'utf8');
  return JSON.parse(raw) as V2AdminSnapshot;
}

export async function importV2AdminSnapshot(snapshot: V2AdminSnapshot, options?: { apply?: boolean }) {
  const apply = options?.apply ?? false;
  const preview = {
    version: snapshot.version,
    exportedAt: snapshot.exportedAt,
    counts: snapshot.counts,
    apply,
  };

  if (!apply) {
    return preview;
  }

  await db.$transaction(async (tx) => {
    await tx.v2AdminSession.deleteMany({});
    await tx.v2ProjectImage.deleteMany({});
    await tx.v2ProjectTranslation.deleteMany({});
    await tx.v2Project.deleteMany({});
    await tx.v2PageSection.deleteMany({});
    await tx.v2SiteSetting.deleteMany({});
    await tx.v2AvailabilityException.deleteMany({});
    await tx.v2AvailabilityRule.deleteMany({});
    await tx.v2Asset.deleteMany({});

    if (snapshot.data.pageSections.length > 0) {
      await tx.v2PageSection.createMany({
        data: snapshot.data.pageSections.map((section) => ({
          id: String(section.id),
          pageKey: String(section.pageKey),
          sectionKey: String(section.sectionKey),
          locale: String(section.locale),
          schemaKey: String(section.schemaKey),
          dataJson: section.dataJson as object,
          displayOrder: Number(section.displayOrder),
          published: Boolean(section.published),
          createdAt: toDate(section.createdAt) ?? undefined,
        })),
      });
    }

    if (snapshot.data.projects.length > 0) {
      await tx.v2Project.createMany({
        data: snapshot.data.projects.map((project) => ({
          id: String(project.id),
          slug: String(project.slug),
          category: String(project.category),
          location: String(project.location),
          year: Number(project.year),
          featured: Boolean(project.featured),
          isPublished: Boolean(project.isPublished),
          sortOrder: Number(project.sortOrder),
          coverImageUrl: typeof project.coverImageUrl === 'string' ? project.coverImageUrl : null,
          createdAt: toDate(project.createdAt) ?? undefined,
        })),
      });
    }

    if (snapshot.data.projectTranslations.length > 0) {
      await tx.v2ProjectTranslation.createMany({
        data: snapshot.data.projectTranslations.map((translation) => ({
          id: String(translation.id),
          projectId: String(translation.projectId),
          locale: String(translation.locale),
          title: String(translation.title),
          shortDescription: typeof translation.shortDescription === 'string' ? translation.shortDescription : null,
          description: typeof translation.description === 'string' ? translation.description : null,
          challengeText: typeof translation.challengeText === 'string' ? translation.challengeText : null,
          approachText: typeof translation.approachText === 'string' ? translation.approachText : null,
          resultText: typeof translation.resultText === 'string' ? translation.resultText : null,
          projectType: typeof translation.projectType === 'string' ? translation.projectType : null,
          duration: typeof translation.duration === 'string' ? translation.duration : null,
          surface: typeof translation.surface === 'string' ? translation.surface : null,
          completionDate: typeof translation.completionDate === 'string' ? translation.completionDate : null,
          seoTitle: typeof translation.seoTitle === 'string' ? translation.seoTitle : null,
          seoDescription: typeof translation.seoDescription === 'string' ? translation.seoDescription : null,
          createdAt: toDate(translation.createdAt) ?? undefined,
        })),
      });
    }

    if (snapshot.data.projectImages.length > 0) {
      await tx.v2ProjectImage.createMany({
        data: snapshot.data.projectImages.map((image) => ({
          id: String(image.id),
          projectId: String(image.projectId),
          imageUrl: String(image.imageUrl),
          alt: typeof image.alt === 'string' ? image.alt : null,
          caption: typeof image.caption === 'string' ? image.caption : null,
          sortOrder: Number(image.sortOrder),
          kind: typeof image.kind === 'string' ? image.kind : 'gallery',
          createdAt: toDate(image.createdAt) ?? undefined,
        })),
      });
    }

    if (snapshot.data.siteSettings.length > 0) {
      await tx.v2SiteSetting.createMany({
        data: snapshot.data.siteSettings.map((setting) => ({
          id: String(setting.id),
          key: String(setting.key),
          valueJson: setting.valueJson as object,
          category: String(setting.category),
          description: typeof setting.description === 'string' ? setting.description : null,
          createdAt: toDate(setting.createdAt) ?? undefined,
        })),
      });
    }

    if (snapshot.data.availabilityRules.length > 0) {
      await tx.v2AvailabilityRule.createMany({
        data: snapshot.data.availabilityRules.map((rule) => ({
          id: String(rule.id),
          dayOfWeek: Number(rule.dayOfWeek),
          timeSlots: Array.isArray(rule.timeSlots) ? rule.timeSlots.map(String) : [],
          isActive: Boolean(rule.isActive),
          createdAt: toDate(rule.createdAt) ?? undefined,
        })),
      });
    }

    if (snapshot.data.availabilityExceptions.length > 0) {
      await tx.v2AvailabilityException.createMany({
        data: snapshot.data.availabilityExceptions.map((exception) => ({
          id: String(exception.id),
          date: toDate(exception.date) ?? new Date(),
          blockedTimes: Array.isArray(exception.blockedTimes) ? exception.blockedTimes.map(String) : [],
          reason: typeof exception.reason === 'string' ? exception.reason : null,
          createdAt: toDate(exception.createdAt) ?? undefined,
        })),
      });
    }

    if (snapshot.data.assets.length > 0) {
      await tx.v2Asset.createMany({
        data: snapshot.data.assets.map((asset) => ({
          id: String(asset.id),
          filename: String(asset.filename),
          originalName: String(asset.originalName),
          mimeType: String(asset.mimeType),
          size: Number(asset.size),
          bucket: String(asset.bucket),
          path: String(asset.path),
          url: String(asset.url),
          alt: typeof asset.alt === 'string' ? asset.alt : null,
          width: typeof asset.width === 'number' ? asset.width : null,
          height: typeof asset.height === 'number' ? asset.height : null,
          tags: Array.isArray(asset.tags) ? asset.tags.map(String) : [],
          createdAt: toDate(asset.createdAt) ?? undefined,
        })),
      });
    }

    const snapshotEmails = snapshot.data.adminUsers
      .map((user) => (typeof user.email === 'string' ? user.email : null))
      .filter((email): email is string => Boolean(email));

    await tx.v2AdminUser.updateMany({
      data: { isActive: false },
      where: snapshotEmails.length > 0 ? { email: { notIn: snapshotEmails } } : undefined,
    });

    for (const user of snapshot.data.adminUsers) {
      const email = String(user.email);
      const existing = await tx.v2AdminUser.findUnique({
        where: { email },
        select: { id: true },
      });

      if (existing) {
        await tx.v2AdminUser.update({
          where: { email },
          data: {
            fullName: String(user.fullName),
            passwordHash: String(user.passwordHash),
            isActive: Boolean(user.isActive),
            lastLoginAt: toDate(user.lastLoginAt),
          },
        });
      } else {
        await tx.v2AdminUser.create({
          data: {
            id: String(user.id),
            email,
            fullName: String(user.fullName),
            passwordHash: String(user.passwordHash),
            isActive: Boolean(user.isActive),
            lastLoginAt: toDate(user.lastLoginAt),
            createdAt: toDate(user.createdAt) ?? undefined,
          },
        });
      }
    }
  });

  return preview;
}
