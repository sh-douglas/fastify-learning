import AppError from "../../shared/errors/app-error.js";

export function getProductCategory(category?: string) {
  if (category === "archived") {
    throw new AppError("Category is unavailable", 409);
  }

  return category ?? "all";
}
