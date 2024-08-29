import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDb = async (payload: TCategory) => {
  const category = await Category.create(payload);
  return category;
};
const getCategoryFromDb = async () => {
  const category = await Category.find();
  return category;
};
const getSingleCategoryFromDb = async (id: string, payload: TCategory) => {
  const category = await Category.findById(id);
  return category;
};
const updateCategoryFromDb = async (id: string, payload: TCategory) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { payload },
    { new: true }
  );
  return category;
};
const deleteCategoryFromDb = async (id: string, payload: TCategory) => {
  const category = await Category.findByIdAndUpdate(
    id,
    { payload },
    { new: true }
  );
  return category;
};

export const CategoryServices = {
  createCategoryIntoDb,
  getCategoryFromDb,
  getSingleCategoryFromDb,
  updateCategoryFromDb,
  deleteCategoryFromDb,
};
