import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';
import { Deadline } from './panels/Deadline';
import DeadlineDetail from './panels/DeadlineDetail'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'

import Button from '@vkontakte/vkui/dist/components/Button/Button'
import { PanelHeader, Group, Cell, CellButton, FormLayout, Select } from '@vkontakte/vkui';
import FormField from '@vkontakte/vkui/dist/components/FormField/FormField'
import Input from '@vkontakte/vkui/dist/components/Input/Input'


import PropTypes from 'prop-types';
import { platform, IOS, ActionSheetItem, ActionSheet } from '@vkontakte/vkui';
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28DeleteOutline from '@vkontakte/icons/dist/28/delete_outline';
import Icon28DeleteOutlineAndroid from '@vkontakte/icons/dist/28/delete_outline_android';
import Icon28CopyOutline from '@vkontakte/icons/dist/28/copy_outline';
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline'; 
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import Icon28ListPlayOutline from '@vkontakte/icons/dist/28/list_play_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline'

import SelectMimicry from '@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry'

const osName = platform();

class App extends React.Component{
	constructor(props) {
    	super(props);

    	this.state = {
			activePanel: 'home',
			selectedDeadline:null,
			time: Date.now(),
			listOfDeadlines: [{
				key:0,
				name:"Новый год",
				occur:new Date('2021-01-01T00:00:00')
			},
			{
				key:1,
				name:"Экзамен по физике",
				occur:new Date('2021-02-02T12:01:00')
			},
			{
				key:2,
				name:"Деделать программку",
				occur:new Date('2021-01-01T18:02:00')
			}]
		}

		this.openDialog = this.openDialog.bind(this);
		this.createNew = this.createNew.bind(this);
		this.delete = this.delete.bind(this);
	}

	componentDidMount() {
		this.intervalID = setInterval(() => this.tick(), 500);
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	tick() {
		this.setState({
		  time: new Date(),
		});
	}

	getLovelyDate(date){
		// Колличество секунд между датами
		let dif = Math.floor((date - Date.now())/1000);

		if(dif <= 0){
			return 'Дедлайн настал!'
		}
		
		let sec = dif % 60;
		dif = Math.floor(dif / 60); // Теперь колличество минут между датами

		let min = dif % 60;
		dif = Math.floor(dif / 60); // Теперь колличество часов между датами

		let hours = dif % 24;
		dif = Math.floor(dif / 24); // Теперь количество дней

		return dif + 'д. ' + hours + 'ч. ' + min + 'м. ' + sec + 'с.';
	}

	delete(){
		let arr = this.state.listOfDeadlines.slice()
		let index = arr.indexOf(this.state.selectedDeadline);

		arr.splice(index, 1)
		this.setState({ listOfDeadlines: arr })
	}

	createNew(e){
		let newDeadline = {
			key:19,
			name:"Новый дедлайн",
			occur:new Date('2021-01-01T23:57:00')
		};
		
		//this.setState({ activePanel: 'persik' })

		this.setState({ listOfDeadlines: this.state.listOfDeadlines.concat(newDeadline), activePanel: 'home' })
	}

	openDialog () {
		this.setState({ popout:
			<ActionSheet 
				onClose={ () => this.setState({ popout: null }) }
				iosCloseItem={<ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}
			>
				<ActionSheetItem autoclose before={<Icon28EditOutline/>} onClick={ () => this.setState({ popout: null, activePanel: 'deadlineDetail'})}>
					Редактировать
				</ActionSheetItem>
				<ActionSheetItem autoclose before={<Icon28ShareOutline/>}>
				  	Поделиться
				</ActionSheetItem>
				<ActionSheetItem
				  	autoclose
				  	before={platform === IOS ? <Icon28DeleteOutline/> : <Icon28DeleteOutlineAndroid />}
					  mode="danger"
					  onClick={this.delete}
				>
				  	Удалить дедлайн
				</ActionSheetItem>
		  </ActionSheet>
		});
	}

	render(){

        let listOfItems = this.state.listOfDeadlines.map(e => 
			<Cell onClick={ () => {this.setState({selectedDeadline:e}); this.openDialog()} }
				key={this.state.listOfDeadlines.indexOf(e)} indicator={this.getLovelyDate(e.occur)}>
				{e.name}
			</Cell>
        );

		return (
			<View popout={this.state.popout} activePanel={this.state.activePanel}>
				<Panel id='home'>
					<PanelHeader>Дедлайны</PanelHeader>

					<CellButton before={<Icon28AddOutline/>} onClick={ () => this.setState({activePanel:'newDeadline'})}>Создать</CellButton>

					<Group>{listOfItems}</Group>

					<Button onClick={ () => this.setState({activePanel: 'persik'}) }>Клик!</Button>

				</Panel>

				<Persik id='persik'/>

				<Panel id='deadlineDetail'>
					<PanelHeader
						left={<PanelHeaderButton onClick={ () => this.setState({activePanel: 'home'})}>
							{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</PanelHeaderButton>}
					>
						{this.state.selectedDeadline == null ? '' : this.state.selectedDeadline.name}
					</PanelHeader>
				</Panel>

				<Panel id='newDeadline'>
					<PanelHeader
						left={<PanelHeaderButton onClick={ () => this.setState({activePanel: 'home'})}>
							{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</PanelHeaderButton>}
					>
						Новый дедлайн
					</PanelHeader>

					<Group>
						<FormLayout >
							<FormField top="Название">            
                				<Input placeholder="Название"/>
              				</FormField>

							<FormField top="День">            
                				<Input type='date' placeholder="День"/>
              				</FormField>

							<FormField top="Время">            
                				<Input type='time' placeholder="День"/>
              				</FormField>

							<Button type="submit" onClick={this.createNew}>Сохранить</Button>
						</FormLayout>
					</Group>
				</Panel>
			</View>
		);
	}
}

export default App;

