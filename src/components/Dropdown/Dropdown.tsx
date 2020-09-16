import React from 'react';
import './Dropdown.css';

/* interface DropdownProps {
    title: String,
    list: any,
    select?: any
} */

class Dropdown extends React.Component <any, {listOpen: Boolean}> {
    constructor(props: any) {
        super(props);

        this.state = {
            listOpen: false,
        }

        this.toggleList = this.toggleList.bind(this);
        this.select = this.select.bind(this);
    }

    toggleList() {
        this.setState(prevState => ({
            listOpen: !prevState.listOpen
        }));
    }

    select(event: any) {
        const selected = event.target.dataset.value;
        this.props.select(selected);
    }

    render() {
        const list = this.props.list;
        const listOpen = this.state.listOpen;
        return (
            <div className="Dropdown"
                onClick={this.toggleList}
                /* onMouseEnter={() => this.toggleList()}
                onMouseLeave={() => this.toggleList()} */>
                <div className="dd-header">
                    <p>{this.props.title}</p>
                </div>
                {listOpen && <ul className="dd-list">
                    {list.map((item:any,index:number) => {
                        return <li className="dd-list-item" key={index} data-value={item.title} onClick={this.select}>{item.title}</li>
                    })}
                </ul>}
            </div>
        );
    }
} 

export default Dropdown;