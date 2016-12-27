/**
 * Created by Junyoung on 2016. 12. 27..
 */
import React, {Component} from 'react'; // React 임포트

import {WindowResizeListener} from 'react-window-resize-listener';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6

import IconButton from 'material-ui/IconButton';
import SearchButtonIcon from 'material-ui/svg-icons/action/search'
import QuitSearchButtonIcon from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField';

import LectureList from './sub_components/lectures_list';

import Styles from './styles';
import Header from '../../common/header/header'


class SubHeader extends Component {
    render() {
        return (
            <div>
                <IconButton onTouchTap={this.props.onSearchButton} style={Styles.searchButton}>
                    {this.props.findState ? <QuitSearchButtonIcon/> : <SearchButtonIcon/>}
                </IconButton>

                {this.props.findState ?
                        <div className="search-text-container" style={Styles.searchTextContainer}>
                            <TextField
                                multiLine={false}
                                underlineShow={false}
                                onChange={this.props.onChangeSearchText}
                                fullWidth={true}
                                style={Styles.searchText}
                                hintText="교수님 또는 강좌명으로 검색해보세요 :)"
                                hintStyle={{fontSize: '12px', color: '#999999', paddingLeft: 20, paddingRight: 20}}
                                inputStyle={{paddingLeft: 20, paddingRight: 20}}/>
                        </div>
                    : null}
            </div>
        )
    }
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: $(window).height(),
            width: $(window).width(),
            findState: false,
            toFind: '',
            lectureListMargin: 0
        };
    }

    onSearchButton() {
        if (this.state.findState == false)
            this.setState({findState: true, lectureListMargin: 30});
        else
            this.setState({toFind: '', findState: false});
    }

    onChangeSearchText(event) {
        this.setState({toFind: event.target.value})
    }

    render() {


        return (
            <div className="container" style={Object.assign(Styles.container, {height: this.state.height - 80})}>
                <WindowResizeListener onResize={windowSize => {
                    this.setState({height: windowSize.windowHeight, width: windowSize.windowWidth});
                }}/>

                <Header title="LOGO" backButtonDisplay="none"/>
                <SubHeader onSearchButton={this.onSearchButton.bind(this)}
                           findState={this.state.findState}
                           onChangeSearchText={this.onChangeSearchText.bind(this)}/>


                {this.state.findState ? <LectureList
                        find={true}
                        toFind={this.state.toFind}
                        lectureListMargin={this.state.lectureListMargin}/> : <LectureList/>}

                <div style={Styles.subContainer}>
                </div>
            </div>
        );
    }
}

export default Home;