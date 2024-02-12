import Image from "next/image";
import styles from "./data-box.module.css";
import { DataType, DataOrganization } from "../../../public/svgs";

export function DataBox(props) {
    const { title, subtitle, num, type, from } = props;

    const typeString = Array.isArray(type) ? type.join(", ") : type;

    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.subtitle}>{subtitle}</p>
                <div className={styles.infoContainer}>
                    <p>{num} datasets</p>
                    <div>
                        <Image className={styles.imageContainer} src={DataType}/>
                        <p>{typeString}</p>   
                    </div>
                    <div>
                        <Image className={styles.imageContainer} src={DataOrganization}/>
                        <p>{from}</p>
                    </div>  
                </div>
            </div>
        </div>
    );
}