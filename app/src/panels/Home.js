import React from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import List from '@vkontakte/vkui/dist/components/List/List'
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';

import { SimpleCell, CellButton } from '@vkontakte/vkui';

import {Icon28AddOutline} from '@vkontakte/icons/dist/28/add_outline'

import Header from '@vkontakte/vkui/dist/components/Header/Header'
import ListOfDeadlines from './ListOfDeadlines'

import App from '../App'


const listOfDeadlines = [
	{
		name:"Новый год",
		occur:new Date('2021-01-01T00:00:00')
	},
	{
		name:"Экзамен по физике",
		occur:new Date('2021-02-02T12:01:07')
	},
]

class Home extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return (
			<Panel id={this.props.id}>
				<PanelHeader>Дедлайны:</PanelHeader>
				<Button onClick={ () => App.changePanel('persik') }>Клик!</Button>
			</Panel>
		);
	}
}

export default Home;
