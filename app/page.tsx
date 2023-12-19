"use client";
import styles from "./page.module.css";
import BoardInitializer from "@/components/boardInitializer";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <BoardInitializer />
      </div>
    </main>
  );
}
