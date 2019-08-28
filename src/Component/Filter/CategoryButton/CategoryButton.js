import React, { Component } from 'react';
import classes from './CategoryButton.module.css';

class categoryButton extends Component {
    state = {
        isSelected: false
    }
    handleCategoryToggleonClick = () => {
        const { category, onClickCategoryBtn } = this.props;
        const isSelected = !this.state.isSelected;
        this.setState({isSelected: isSelected})
        onClickCategoryBtn(category, isSelected);
    }
    render() {
        const { category } = this.props;
        const isSelectedStyle = this.state.isSelected? classes.Red: classes.White
        const buttonStyle = [isSelectedStyle, classes.CategoryButton].join(' ') 
        return (
        <button className={buttonStyle}               
            onClick={this.handleCategoryToggleonClick}>
            {category}
        </button>
        )
    }
}

export default categoryButton;

// OnClick = toggle the isSelected prop of the button
// OnClick = if isSelected is true for the button then add it to the selectedCategories list in the parent (SearchVideo) 
  
