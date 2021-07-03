import React, {Component} from "react";

import './post-add-form.css';

export default class PostAddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onValueChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    onFormSubmit(e) {
        e.preventDefault();
        this.props.onAdd(this.state.text);
        this.setState({
            text: ''
        });
    }

    render() {
        return (
            <form
                className="bottom-panel d-flex"
                onSubmit={this.onFormSubmit}
            >
                <input
                    type="text"
                    placeholder="О чем вы думаете сейчас?"
                    className="form-control new-post-label"
                    onChange={this.onValueChange}
                    value={this.state.text}
                    required
                />
                <button
                    type="submit"
                    className="btn btn-outline-secondary"
                >
                    Добавить</button>
            </form>
        );
    }
}
