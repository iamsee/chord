'use strict';

import * as React from 'react';
import { connect } from 'react-redux';

import { IStateGlobal } from 'chord/workbench/api/common/state/stateGlobal';

import { PlayerView } from 'chord/workbench/parts/player/browser/playerView';
import { NavigationView } from 'chord/workbench/parts/navigation/browser/navigationView';
import { IRootViewProps } from 'chord/workbench/electron-browser/props/rootView';

import { getMainBackground } from 'chord/workbench/electron-browser/media/mainBackground';

import MenuView from 'chord/workbench/parts/menu/browser/menuView';

import MainView from 'chord/workbench/parts/mainView/browser/mainView';


function closeMenu() {
    document.querySelectorAll('.react-contextmenu').forEach(elm => {
        let menu = elm as HTMLElement;
        menu.style.display = 'none';
    });
}

/**
 * window scroll event
 */
window.addEventListener('scroll', function() {
    closeMenu();
});


class RootView extends React.Component<IRootViewProps, any> {

    constructor(props: IRootViewProps) {
        super(props);

        this.handleGlobalClickAndSCroll = this.handleGlobalClickAndSCroll.bind(this);
    }

    handleGlobalClickAndSCroll() {
        closeMenu();
    }

    render() {
        let viewKey = this.props.viewKey;
        let background = getMainBackground(viewKey);

        return (
            <div onClick={() => this.handleGlobalClickAndSCroll()}
                onScroll={() => this.handleGlobalClickAndSCroll()}>

                <div className='main-background'
                    style={{ backgroundImage: background }}></div>

                <div className='top-container'>
                    <NavigationView />
                    <MainView />
                </div>

                <div>
                    {/* PlayView */}
                    <PlayerView />
                </div>

                <MenuView />

            </div>
        );
    }
}


function mapStateToProps(state: IStateGlobal) {
    return { viewKey: state.mainView.view };
}


export default connect(mapStateToProps)(RootView);
