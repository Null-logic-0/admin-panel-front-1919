
import styles from './Search.module.scss'

type InputProps ={
     onchange?:()=>void;
    }

    const Search =({onchange}:InputProps) => {
    return ( 
        <input 
            onChange={onchange}
            type="text" 
            placeholder='Search user...' 
            className={styles.Input} 
        />
    )
}

export default Search;