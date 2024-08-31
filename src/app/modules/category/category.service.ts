import QueryBuilder from "../../builder/QueryBuilder";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";

const createCategoryIntoDb = async (payload: TCategory) => {
  const category = await Category.create(payload);
  return category;
};
const getCategoryFromDb = async (query: Record<string, unknown>) => {
  const queryCategory = new QueryBuilder(
    Category.find().select("-isDeleted"),
    query
  )
    .search(["name"])
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await queryCategory.modelQuery;
  return result;
};
const getSingleCategoryFromDb = async (id: string) => {
  const category = await Category.findById(id).where({
    isDeleted: { $ne: true },
  });
  return category;
};
const updateCategoryFromDb = async (
  id: string,
  payload: Partial<TCategory>
) => {
  const category = await Category.findByIdAndUpdate(id, payload, { new: true });
  return category;
};
const deleteCategoryFromDb = async (
  id: string,
  payload: Partial<TCategory>
) => {
  const category = await Category.findByIdAndUpdate(id, payload, {
    $set: { isDeleted: true },
  });
  return category;
};

export const CategoryServices = {
  createCategoryIntoDb,
  getCategoryFromDb,
  getSingleCategoryFromDb,
  updateCategoryFromDb,
  deleteCategoryFromDb,
};
