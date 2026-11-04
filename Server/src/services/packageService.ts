import AccessPackage from '../models/AccessPackage.js';
import { StudentCategory } from '../models/StudentCategoryAccess.js';

/**
 * Get active package for a student category
 */
export async function getPackageForCategory(
  studentCategory: StudentCategory
): Promise<AccessPackage | null> {
  return await AccessPackage.findOne({
    where: {
      studentCategory,
      isActive: true,
    },
  });
}

/**
 * Get all active packages
 */
export async function getAllActivePackages(): Promise<AccessPackage[]> {
  return await AccessPackage.findAll({
    where: {
      isActive: true,
    },
    order: [['studentCategory', 'ASC']],
  });
}

/**
 * Create a new access package
 */
export async function createPackage(data: {
  name: string;
  studentCategory: StudentCategory;
  price: number;
  currency?: string;
  durationDays?: number;
  description?: string;
}): Promise<AccessPackage> {
  return await AccessPackage.create({
    ...data,
    currency: data.currency || 'ETB',
    isActive: true,
  });
}

/**
 * Update package
 */
export async function updatePackage(
  packageId: string,
  updates: Partial<{
    name: string;
    price: number;
    currency: string;
    durationDays: number;
    description: string;
    isActive: boolean;
  }>
): Promise<AccessPackage | null> {
  const pkg = await AccessPackage.findByPk(packageId);
  if (!pkg) return null;

  await pkg.update(updates);
  return pkg;
}

/**
 * Deactivate a package
 */
export async function deactivatePackage(packageId: string): Promise<boolean> {
  const result = await AccessPackage.update(
    { isActive: false },
    { where: { id: packageId } }
  );
  return result[0] > 0;
}
