import React from 'react';
import PropTypes from 'prop-types';
import PageListItem from './PageListItem';
import LoadingPage from "../LoadingPage";
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { getDefaultValues, translate } from 'ra-core';
import Button from '@material-ui/core/Button';
import { setfbAsyncInit, fbEnsureInit, fbLoadPages, fbRequestPagePicture } from '../../util';
import SnackbarError from '@material-ui/core/Snackbar';
import SnackbarOk from '@material-ui/core/Snackbar';
import UpdatePage from './UpdatePage';
import { push as pushAction } from 'react-router-redux';

const styles = theme => ({
    main: {
        width: '75%',
        minWidth: '400px',
        margin: 'auto',
        background: '#f4f4f4',
        padding: '20px',
    },
    divloader: {
        height: '400px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        textAlign: 'center',
    },
    buttons: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around'
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class PageList extends React.Component {
    state = {
        pages: [],
        pagePictures: [],
        loading: true,
        checked: [],
        fbLoaded: false,
        checkedPage: [],
        openSnackError: false,
        openSnackOk: false,
        confirmEnabled: false,
    };

    componentDidMount() {
        // Assuring that FB is bound to window
        setfbAsyncInit();
        fbEnsureInit(() => {
            this.loadPages().then(() => {
                this.setState(() => ({ loading: false }));
            }).catch((err) => {
                console.log(err);
            });
        });
    }

    /*
    * When the user 'toggles' the page option
    */
    handleToggle = (value) => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        // No page selected (checked.length) and the user is selecting a new toggle (currentIndex===-1)
        if (checked.length === 0 && currentIndex === -1) {
            newChecked.push(value);
            const checkedPage = this.state.pages.filter((page) =>
                page.name === newChecked[0]
            );
            this.setState({
                checked: newChecked,
                checkedPage: checkedPage,
                confirmEnabled: true
            });
        } else if (checked.length === 1) {
            if (currentIndex !== -1) {
                newChecked.splice(currentIndex, 1);
                this.setState({
                    checked: newChecked,
                    checkedPage: [],
                });
            }
            else {
                this.setState({ openSnackError: true });
            }
        } else {
            this.setState({ openSnackError: true });
        }
    };

    // Close the snackbar notification
    handleRequestClose = () => {
        this.setState({
            openSnackError: false,
            openSnackOk: false,
        });
    };

    handleConfirmUpdate = () => {
        if (this.state.checkedPage.length > 0) {
            localStorage.setItem('activePage', this.state.checkedPage[0].id);
        }
        this.setState({
            openSnackOk: true
        });
    }

    handleBackButton = () => {
        this.props.dispatch(this.props.push("/"));
    }

    loadPages = async () => {
        if (!window.FB) return;

        const accessToken = await localStorage.getItem('accessToken');
        const activePageID = await localStorage.getItem('activePage');

        try {
            const pagesData = await fbLoadPages(accessToken);
            const picturesData = await this.loadPagePictures(pagesData);
            this.setState({ pages: pagesData.data, pagePictures: picturesData }, () => {
                if (activePageID !== null) {
                    const activePage = pagesData.data.filter((page) =>
                        page.id === activePageID
                    );

                    if (activePage.length !== 0) {
                        const newChecked = [];
                        newChecked.push(activePage[0].name);

                        this.setState({
                            checked: newChecked,
                            checkedPage: activePage[0],
                        });
                    }
                }
            });
        } catch (error) {
            console.log(accessToken);
            console.log(error);
        }
    }


    loadPagePictures = async (pagesData) => {
        const picturesArray = pagesData.data.map(async page => fbRequestPagePicture(page));
        return Promise.all(picturesArray);
    };

    render() {
        const { classes } = this.props;
        return (
            this.state.loading ? <LoadingPage className={classes.divloader} /> :
                <div className={classes.main}>
                    <div className={classes.header}>
                        <h2>Páginas do Facebook</h2>
                        <br />
                        <h3>Selecione a página que será conectada ao bot</h3>
                    </div>
                    <div>
                        <List>
                            {this.state.pagePictures.map((page) => {
                                return (
                                    <PageListItem key={page.id} {...page} onChange={this.handleToggle.bind(this)} checked={this.state.checked} />
                                );
                            })}
                        </List>
                    </div>
                    <div className={classes.buttons}>
                        <UpdatePage
                            disabled={!this.state.confirmEnabled || this.state.checked.length === 0}
                            record={this.state.checkedPage[0]}
                            confirmUpdate={this.handleConfirmUpdate}
                        />
                        <Button variant="raised"
                            type="submit"
                            color="primary"
                            onClick={this.handleBackButton}>Voltar</Button>
                    </div>
                    <SnackbarOk
                        open={this.state.openSnackOk}
                        message="Página atualizada com sucesso."
                        autoHideDuration={4000}
                        onClose={this.handleRequestClose}
                    />
                    <SnackbarError
                        open={this.state.openSnackError}
                        message="Não é possível selecionar mais de uma página."
                        autoHideDuration={4000}
                        onClose={this.handleRequestClose}
                    />
                </div >
        );
    }
};

PageList.propTypes = {
    classes: PropTypes.object.isRequired,
    push: PropTypes.func,
}

const enhance = compose(
    connect((state, props) => ({
        initialValues: getDefaultValues(state, props),
        push: pushAction,
    })),
    withStyles(styles)
);

export default enhance(PageList);
// export default withStyles(styles)(PageList);