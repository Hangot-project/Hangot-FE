import Image from "next/image";
import styles from "./search-box.module.css";
import { SearchSymbol } from "../../../public/svgs";

export function SearchBox() {
    console.log("SearchSymbol >>>", SearchSymbol)
    
    return (
        <form className={styles.searchbox_container}>
            <input type="text" placeholder="검색어를 입력해주세요." className={styles.searchbox_input}/>
            <Image className={styles.searchbox_img} src={SearchSymbol}/>
        </form>
    );
}