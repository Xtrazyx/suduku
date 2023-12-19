import { createContext } from "react";
import { BoardSolution } from "@/components/boardInitializer";

export const BoardContext = createContext<{ solution: BoardSolution }>({ solution: [] });
export const BoardContextProvider = BoardContext.Provider;
