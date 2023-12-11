import { createContext } from "react";
import { BoardSolution } from "@/app/page";

export const BoardContext = createContext<{ solution: BoardSolution }>({ solution: [] });
export const BoardContextProvider = BoardContext.Provider;
