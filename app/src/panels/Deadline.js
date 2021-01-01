import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import './Deadline.css';
export {Deadline};

class Deadline extends React.Component{
    constructor(props){
        super(props);
        this.state = {class: "b"};
          
        this.press = this.press.bind(this);
    }

    press(){
        let className = (this.state.class === "gr") ? "b" : "gr";
        this.class = className;
        this.setState({class: className});
    }

    render(){
        const ele = this.props.ele;

        const listItems = ele.map((e) => <li>{e.name + " " + e.occur}</li> );
        return (<ul onClick={this.press} class={this.state.class} >{listItems}</ul>);
    }
}