import React, {Component} from "react";

import './post-list-item.css';

export default class PostListItem extends Component {
    render() {
        const {label, onDelete, onImportantChange, onLikedChange, important, liked} = this.props;

        let classNames = 'app-list-item d-flex justify-content-between';

        if (important) {
            classNames += ' important';
        }

        if (liked) {
            classNames += ' like';
        }

        return (
            <div className={classNames}>
            <span
                className="app-list-item-label"
                onClick={onLikedChange}
            >
                {label}
            </span>
                <div className="d-flex justify-content-center align-items-center">
                    <button
                        type="button"
                        className="btn-star btn-sm"
                        onClick={onImportantChange}
                    >
                        <i className="fa fa-star"></i>
                    </button>
                    <button
                        type="button"
                        className="btn-trash btn-sm"
                        onClick={onDelete}
                    >
                        <i className="fa fa-trash"></i>
                    </button>
                    <i className="fa fa-heart"></i>
                </div>
            </div>
        );
    }
}
