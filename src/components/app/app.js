import React, {Component} from "react";
import nextId from "react-id-generator";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {label: "Go to learning React!", important: false, liked: false, id: nextId()},
                {label: "This amazing action for you.", important: false, liked: false, id: nextId()},
                {label: "I hope that you is love is...", important: false, liked: false, id: nextId()},
            ],
            term: '',
            filter: 'all'
        }

        this.delItem = this.delItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onImportantChange = this.onImportantChange.bind(this);
        this.onLikedChange = this.onLikedChange.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onUpdateFilter = this.onUpdateFilter.bind(this);

        this.changeBooleanState = (stateFieldName, id) => {
            this.setState(({data}) => {
                const index = data.findIndex(elem => elem.id === id);

                const old = data[index];

                let newItem;

                if (stateFieldName === 'important') {
                    newItem = {...old, important: !old.important};
                } else {
                    newItem = {...old, liked: !old.liked};
                }

                const newData = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

                return {
                    data: newData
                }
            })
        }
    }

    searchPosts(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => item.label.indexOf(term) > -1);
    }

    filterPosts(items, filter) {
        if (filter === 'all') {
            return items;
        }

        return items.filter(item => item.liked);
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    onUpdateFilter(filter) {
        this.setState({filter});
    }

    delItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex((elem) => elem.id === id);

            const newData = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newData
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            id: nextId()
        }

        this.setState(({data}) => {
            const newData = [...data, newItem];
            return {
                data: newData
            }
        })
    }

    onImportantChange(id) {
        this.changeBooleanState('important', id);
    }

    onLikedChange(id) {
        this.changeBooleanState('liked', id);
    }

    render() {
        const {data, term, filter} = this.state;

        const likedCount = data.filter(elem => elem.liked).length;
        const allCount = data.length;


        const visiblePosts = this.filterPosts(this.searchPosts(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                    likedCount={likedCount}
                    allCount={allCount}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter
                        filter={filter}
                        onUpdateFilter={this.onUpdateFilter}
                    />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={(id) => this.delItem(id)}
                    onImportantChange={this.onImportantChange}
                    onLikedChange={this.onLikedChange}
                />
                <PostAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}
