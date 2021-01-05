import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, Panel, platform, IOS, ActionSheetItem, ActionSheet, PanelHeader, CellButton } from '@vkontakte/vkui';
import PropTypes from 'prop-types';

import Icon28DeleteOutline from '@vkontakte/icons/dist/28/delete_outline';
import Icon28DeleteOutlineAndroid from '@vkontakte/icons/dist/28/delete_outline_android';
import Icon28ShareOutline from '@vkontakte/icons/dist/28/share_outline'; 
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon28CheckSquareOutline from '@vkontakte/icons/dist/28/check_square_outline';

import Icon28CancelOutline from '@vkontakte/icons/dist/28/cancel_outline';

import EditDeadlinePanel from './panels/EditDeadlinePanel';
import ListOfDeadlines from './panels/ListOfDeadlines';

import './styles/description.css';

const osName = platform();

class App extends React.Component{
	constructor(props) {
    	super(props);

    	this.state = {
			activePanel: 'home',
			selectedDeadline:null,
			listOfDeadlines: []
		}

		this.editDeadline = this.editDeadline.bind(this);
		this.deleteDeadline = this.deleteDeadline.bind(this);
		this.createDeadline = this.createDeadline.bind(this);
		this.selectItem = this.selectItem.bind(this);

		this.getSelectedName = this.getSelectedName.bind(this);
		this.getSelectedDay = this.getSelectedDay.bind(this);
		this.getSelectedTime = this.getSelectedTime.bind(this);

		this.getSaves = this.getSaves.bind(this);
		this.setSaves = this.setSaves.bind(this);
		this.shareDeadline = this.shareDeadline.bind(this);
		this.tickDeadline = this.tickDeadline.bind(this);
		this.untickDeadline = this.untickDeadline.bind(this);

		this.getSaves();
	}

	shareDeadline(){
		let deadline = this.state.selectedDeadline;

		let dateOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}

		let date = deadline.occur.toLocaleDateString('ru', dateOptions);
		let time = deadline.occur.toTimeString().substr(0, 5);

		let message = `У меня новый дедлайн под названием "${deadline.name}"! Он наступит ${date} в ${time}!\nЗадай и свой дедлайн в приложении Дедлайны ВКонтакте!`;
		
		bridge.send('VKWebAppShowWallPostBox', {
			'message': message,
			'attachments': 'photo212141958_457245647,https://vk.com/app7714271',
		});
	}

	getSaves(){
		bridge.send('VKWebAppStorageGet', {'keys': ['deadlines']})
			.then(data => {
				let jsonString = data.keys[0].value;

				let entities = JSON.parse(jsonString);

				let edited = entities.map(e => {
					return {
						name: e.name,
						occur: new Date(e.occur),
						ticked: e.ticked == undefined ? false : e.ticked,
					}
				});

  				this.setState( {listOfDeadlines: edited } );

			})
			.catch(error => {
				console.log(error);
			});
	}
	
	setSaves(){
		let jsonString = JSON.stringify(this.state.listOfDeadlines);
	
		bridge.send('VKWebAppStorageSet', {'key': 'deadlines', 'value': jsonString})
			.then(data => {
				console.log('Успешно сохранено!');
			})
			.catch(error => {
				console.log(error);
			});
	}

	deleteDeadline(){
		let index = this.state.listOfDeadlines.indexOf(this.state.selectedDeadline);
		if(index == -1){
			return;
		}
		this.state.listOfDeadlines.splice(index, 1);
		this.setState({ listOfDeadlines: this.state.listOfDeadlines});

		this.setSaves();
	}

	// deadline has fields: deadlineName, deadlineDate, deadlineTime
	createDeadline(deadline){
		let name = deadline.deadlineName == '' ? 'Безымянный' : deadline.deadlineName;

		let time;
		if(deadline.deadlineDate == ''){
			time = '2021-01-01T';
		}
		else{
			time = deadline.deadlineDate + 'T'
		}

		if(deadline.deadlineTime == ''){
			time += '00:00:00';
		}
		else{
			time += deadline.deadlineTime + ':00';
		}

		let newDeadline = {
			name: name,
			occur:new Date(time),
			ticked: false,
		};

		this.state.listOfDeadlines.push(newDeadline);
		
		this.setState({ listOfDeadlines: this.state.listOfDeadlines, activePanel: 'home' });

		this.setSaves();
	}

	// deadline has fields: deadlineName, deadlineDate, deadlineTime
	editDeadline(deadline){
		let name = deadline.deadlineName == '' ? 'Безымянный' : deadline.deadlineName;

		let time;
		if(deadline.deadlineDate == ''){
			time = '2021-01-01T';
		}
		else{
			time = deadline.deadlineDate + 'T'
		}

		if(deadline.deadlineTime == ''){
			time += '00:00:00';
		}
		else{
			time += deadline.deadlineTime + ':00';
		}

		let editedDeadline = {
			name: name,
			occur:new Date(time),
		};

		let index = this.state.listOfDeadlines.indexOf(this.state.selectedDeadline);
		if(index == -1){
			return;
		}

		this.state.listOfDeadlines[index] = editedDeadline;

		this.setState({ listOfDeadlines: this.state.listOfDeadlines, activePanel: 'home' });

		this.setSaves();
	}

	tickDeadline(){
		this.state.selectedDeadline.ticked = true;

		// Хук, чтобы перерисовать список дедлайнов
		this.setState({listOfDeadlines: this.state.listOfDeadlines});
		this.setSaves();
	}

	untickDeadline(){
		this.state.selectedDeadline.ticked = false;

		// Хук, чтобы перерисовать список дедлайнов
		this.setState({listOfDeadlines: this.state.listOfDeadlines});
		this.setSaves();
	}

	// deadline has fields: name, occur, ticked
	selectItem(deadline){
		this.setState( { selectedDeadline: deadline} );

		let tickItem;

		if(deadline.ticked){
			tickItem = 	<ActionSheetItem autoclose before={<Icon28CancelOutline/>}
							onClick={() => this.untickDeadline()}>
							Отметить как невыполненный
						</ActionSheetItem>
		}
		else{
			tickItem = 	<ActionSheetItem autoclose before={<Icon28CheckSquareOutline/>}
							onClick={() => this.tickDeadline()}>
							Отметить как выполненный
						</ActionSheetItem>
		}

		this.setState({ popout:
			<ActionSheet 
				onClose={ () => this.setState({ popout: null }) }
				iosCloseItem={<ActionSheetItem autoclose mode="cancel">Отменить</ActionSheetItem>}>

				{tickItem}

				<ActionSheetItem autoclose before={<Icon28EditOutline/>}
					onClick={ () => { this.setState({ popout: null, activePanel: 'editDeadline'}); } }>
					Редактировать
				</ActionSheetItem>

				<ActionSheetItem autoclose before={<Icon28ShareOutline/>}
					onClick={() => this.shareDeadline()}>
				  	Поделиться
				</ActionSheetItem>

				<ActionSheetItem
				  	autoclose
				  	before={platform === IOS ? <Icon28DeleteOutline/> : <Icon28DeleteOutlineAndroid />}
					  mode='destructive'
					  onClick={this.deleteDeadline}>
				  	Удалить
				</ActionSheetItem>
		  	</ActionSheet>
		});
	}

	getSelectedName(){
		if(this.state.selectedDeadline == null){
			return '';
		}
		else{
			return this.state.selectedDeadline.name;
		}
	}

	getSelectedDay(){
		if(this.state.selectedDeadline == null){
			return '';
		}
		else{
			let year = this.state.selectedDeadline.occur.getFullYear();
			let month = this.state.selectedDeadline.occur.getMonth() + 1;
			let day = this.state.selectedDeadline.occur.getDate();


			if(month < 10){
				month = '0' + month;
			}
			if(day < 10){
				day = '0' + day;
			}

			return year + '-' + month + '-' + day;
		}
	}

	getSelectedTime(){
		if(this.state.selectedDeadline == null){
			return '';
		}
		else{
			let hours = this.state.selectedDeadline.occur.getHours();
			let mins = this.state.selectedDeadline.occur.getMinutes();

			if(hours < 10){
				hours = '0' + hours;
			}
			if(mins < 10){
				mins = '0' + mins;
			}
			
			return hours + ':' + mins;
		}
	}

	render(){
		return (
			<View popout={this.state.popout} activePanel={this.state.activePanel}>
				<Panel id='home'>
					<PanelHeader>Дедлайны</PanelHeader>
					<CellButton before={<Icon28AddOutline/>} onClick={ () => this.setState({activePanel:'newDeadline'})}>Создать</CellButton>

					<ListOfDeadlines onChoose={this.selectItem} elements={this.state.listOfDeadlines}/>
				</Panel>

				<EditDeadlinePanel 
					id='newDeadline' onSend={this.createDeadline} onBack={() => this.setState({activePanel: 'home'})}
					deadlineName='' deadlineDate='' deadlineTime=''/>

				<EditDeadlinePanel 
					id='editDeadline' onSend={this.editDeadline} onBack={() => this.setState({activePanel: 'home'})}
					deadlineName={this.getSelectedName()}
					deadlineDate={this.getSelectedDay()}
					deadlineTime={this.getSelectedTime()}/>
			</View>
		);
	}
}

export default App;

