import React, { Component } from 'react';

import EntryList from './components/EntryList';
import Search from './components/Search';
import SimpleAppBar from './components/SimpleAppBar';
import ViewerDialog from './components/ViewerDialog';
import './App.css';
import * as helpers from './App.helpers';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: null,
            fileLink: null,
            fileName: null,
            isSearching: false,
            path: '',
        };
    }

    componentDidMount() {
        helpers
            .loadEntries(this.state.path)
            .then(entries => this.setState({ entries }));
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            this.state.path !== prevState.path ||
            (!this.state.isSearching && prevState.isSearching)
        ) {
            helpers
                .loadEntries(this.state.path)
                .then(entries => this.setState({ entries }));
        }
    }

    render() {
        return (
            <div>
                <SimpleAppBar title={process.env.REACT_APP_TITLE} />
                <EntryList
                    entries={this.state.entries}
                    onFileClick={this.handleFileClick.bind(this)}
                    onFolderClick={this.handleFolderClick.bind(this)}
                />
                <Search
                    isActive={this.state.isSearching}
                    onSearch={this.handleSearch.bind(this)}
                    onToggle={this.handleSearchToggle.bind(this)}
                />
                <ViewerDialog
                    fileLink={this.state.fileLink}
                    fileName={this.state.fileName}
                    onClose={this.handleViewerClose.bind(this)}
                />
            </div>
        );
    }

    handleFileClick(path) {
        helpers.loadFileLink(path).then(file => {
            this.setState({
                fileLink: file.link,
                fileName: file.metadata.name,
            });
        });
    }

    handleFolderClick(path) {
        this.setState({ entries: null, isSearching: false, path });
    }

    handleViewerClose() {
        this.setState({ fileLink: null });
    }

    handleSearch(query) {
        this.setState({ entries: null });
        helpers.searchFiles(query).then(entries => this.setState({ entries }));
    }

    handleSearchToggle() {
        this.setState({ isSearching: !this.state.isSearching });
    }
}

export default App;
