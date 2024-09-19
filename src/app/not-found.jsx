import Link from "next/link"
import styles from "./not-found.module.css"

function Page() {
    return (
        <>
            <div className={styles.main}>
                <h1 className={styles.h1}>404 - Page Not Found</h1>
                <p className={styles.p}>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
                <Link legacyBehavior href="/"><a className={styles.a}>Go Back Home</a></Link>
            </div>
        </>
    )
}

export default Page