import { ERROR_MESSAGES } from "../types/enums";
import type { IUserDocument, User } from "../types/user";
import UserModel from "../models/user";
import { FilterQuery, UpdateQuery } from "mongoose";

export async function findUser(
  query: FilterQuery<IUserDocument>,
  selectedItems?: string | string[]
) {
  const dbUser: IUserDocument | null = await UserModel.findOne(query).select(
    selectedItems ? selectedItems : undefined
  );

  if (!dbUser) throw new Error(ERROR_MESSAGES.INCORRECT_EMAIL);

  return dbUser;
}

export async function insertUser(user: User) {
  const dbUser: IUserDocument = new UserModel<User>({
    ...user,
  });

  await dbUser.save();

  return findUser({ email: dbUser.email }, ["email"]);
}

export async function updateUser(
  query: FilterQuery<IUserDocument>,
  update: UpdateQuery<IUserDocument>
) {
  await UserModel.updateOne(query, update);
}

export async function deleteUser(user: Pick<User, "email">) {
  await UserModel.updateOne({ email: user.email }, { $unset: { email: 1 } });
}
