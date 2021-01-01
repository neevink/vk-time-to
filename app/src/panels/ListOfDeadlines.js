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

import DeadlineDetail from './DeadlineDetail'

class ListOfDeadlines extends React.Component{
    constructor(props){
        super(props);
        
    }

    press(id){
        DeadlineDetail.selected=id;
    }

    render(){
        const elements = this.props.elements;

        const listOfItems = elements.map(e => 
            <Cell id={e.id} onClick={this.press(e.id)} data-to="deadlineDetail" indicator={e.occur.toString()}>{e.name}</Cell>
        );

        return (<Group>{listOfItems}</Group>);
    }
}

export default ListOfDeadlines;