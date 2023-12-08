import styles from './page.module.css';
import { Case } from '@/components/case';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Case coordX={5} coordY={7} value={9} />
        Bonjour SUDUKU
      </div>
    </main>
  )
}
