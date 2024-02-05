import { User } from "@/types/User";
import { atom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export const userAtom = atom<User | null>(null);

