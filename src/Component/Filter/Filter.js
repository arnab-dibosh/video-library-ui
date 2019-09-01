import React from 'react'
import CategoryButton from './CategoryButton/CategoryButton'
import classes from './Filter.module.css'

function filter (props) {
    const { categories, onClickCategory } = props;
    const buttonList = categories.map(category => {
                    return <CategoryButton 
                    key={category}
                    onClickCategoryBtn={onClickCategory}
                    category={category} 
                    /> })
    return (
        <div className={classes.ButtonContainer}>
            {buttonList}
        </div>        
    
    )
}

export default filter;


  
