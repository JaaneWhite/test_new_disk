import {createStore} from 'vuex'
import axios from 'axios'
import * as api from "@/api.js";
export default createStore({
    state () {
        return {
            userEmail: '',
            notesList: [],
            token: '',
            modalShow: false,
            currentFormName: 'loginForm',
            pageViewNotes: false,
            loginForm: {
                fields: {
                    email: {
                        id: 'email',
                        title: 'Email',
                        placeholder: 'Введите Email',
                        value: '',
                        class: 'email',
                        type: 'email'},
                    password: {
                        id: 'password',
                        title: 'Пароль',
                        placeholder: 'Введите пароль',
                        value: '',
                        class: 'password',
                        type: 'password'}
                },
                title: 'Вход в ваш аккаунт',
                text: 'У вас нет аккаунта?',
                link: {
                    text: 'Зарегистрируйтесь'
                },
                btnText: 'Войти',
                action: 'login',
                errorMessage: '',
                regSuccessMessage: ''

            },
            registerForm: {
                fields: {
                    email: {
                        id: 'email',
                        title: 'Email',
                        placeholder: 'Введите Email',
                        value: '',
                        class: 'email',
                        type: 'email'},
                    password: {
                        id: 'password',
                        title: 'Пароль',
                        placeholder: 'Введите пароль',
                        value: '',
                        class: 'password',
                        type: 'password'},
                    confirmPassword: {
                        id: 'confirmPassword',
                        title: 'Пароль ещё раз',
                        placeholder: 'Введите пароль ещё раз',
                        value: '',
                        class: 'password',
                        type: 'password'},
                },
                title: 'Регистрация',
                text: 'У вас есть аккаунт?',
                link: {
                    text: 'Войдите'
                },
                btnText: 'Регистрация',
                action: 'register',
                errorMessage: ''

            },
            newNoteForm: {
                fields: {
                    title: {
                        id: 'title',
                        title: 'Название заметки',
                        placeholder: 'Введите название',
                        value: '',
                        class: 'title',
                        type: 'text',
                        size: 100

                    },
                    content: {
                        id: 'content',
                        title: 'Текст заметки',
                        placeholder: 'Введите текст',
                        value: '',
                        class: 'content',
                        type: 'text',
                        size: 500
                    },

                },
                title: 'Добавление заметки',
                text: '',
                link: {
                    text: ''
                },
                btnText: 'Добавить',
                action: 'addNote',
                errorMessage: ''
            }
        }
    },
    getters: {

    },

    mutations: {
        setModalShow(state, {val, activeForm}) {
            state.modalShow = val
            state.currentFormName = activeForm
        },
        switchFieldType(state, payload) {
            if (state[payload.formName].fields[payload.fieldName].type === 'password') {
                state[payload.formName].fields[payload.fieldName].type = 'text'
            } else {
                state[payload.formName].fields[payload.fieldName].type = 'password'
            }
        },
        switchForm(state) {
            if (state.currentFormName === 'loginForm') {
                state.currentFormName = 'registerForm'
            } else {
                state.currentFormName = 'loginForm'
            }
        },
        setErrorMessage(state, payload ) {
            state[payload.formName].errorMessage = payload.value
        },
        setToken(state, token) {
            state.token = token
        },
        setPageViewNotes(state, val) {
            state.pageViewNotes = val
        },
        setNotes(state, val) {
            state.notesList = val
        },
        setUserEmail(state, val) {
            state.userEmail = val
        },


    },
    actions: {
        openModal({state, commit, dispatch}, {formName}) {
            commit('setModalShow', {val: true, activeForm: formName})
        },
        async login({state, commit, dispatch}) {
            let loginData = {
                "email": state.loginForm.fields.email.value,
                "password": state.loginForm.fields.password.value,
            }
            try {
                const response = await axios.post(`https://dist.nd.ru/api/auth`, loginData)
                commit("setErrorMessage", {formName: 'loginForm', value: ''})
                if (response.data) {
                    if (response.data.accessToken) {
                        commit('setToken', response.data.accessToken)
                        commit('setModalShow', false)
                        commit('setPageViewNotes', true)
                        commit('setUserEmail', state.loginForm.fields.email.value)
                        try {
                            const notesResponse = await dispatch('loadNotes');
                            if (notesResponse) {
                                commit('setNotes', notesResponse)
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            } catch (e) {
                if (e.response) {
                    commit("setErrorMessage", {formName: 'loginForm', value: e.response.data.message})
                } else {
                }
                throw e;
            }
        },
        async register({state, commit}) {
            let regData = {
                "email": state.registerForm.fields.email.value,
                "password": state.registerForm.fields.password.value,
                "confirm_password": state.registerForm.fields.confirmPassword.value
            }
            try {
                const response = await axios.post(`https://dist.nd.ru/api/reg`, regData)
                if (response.status === 200) {
                    state.loginForm.regSuccessMessage = 'Вы успешно зарегистрированы'
                    state.currentFormName = 'loginForm'
                }
            } catch (e) {
                if (e.response) {
                    commit("setErrorMessage", {formName: 'registerForm', value: e.response.data.message})
                } else {
                }
                throw e;
            }
        },
        async loadNotes({state, commit}) {
            try {
                const response = await axios.get(`https://dist.nd.ru/api/notes`, {
                    headers: {
                        'accept' : 'application/json',
                        'authorization': `Bearer ${state.token}`
                    },
                })
                commit('setNotes', response.data)
                console.log(response.data)
            } catch (e) {
                console.log(e)
            }
        },
        async logout({state, commit}) {
            try {
                const response = await axios.delete(`https://dist.nd.ru/api/auth`, {
                    headers: {
                        'accept' : 'application/json',
                        'authorization': `Bearer ${state.token}`
                    },
                })
                commit('setToken', '')
                commit('setUserEmail', '')
                console.log(response.data)
            } catch (e) {
                console.log(e)
            }
        },
        async addNote({state, commit, dispatch}) {
            console.log('store addNote')
            let noteData = {
                "title": state.newNoteForm.fields.title.value,
                "content": state.newNoteForm.fields.content.value,
            }
            try {
                const response = await axios.post(`https://dist.nd.ru/api/notes`, noteData,
                    {
                        headers: {
                            'accept' : 'application/json',
                            'authorization': `Bearer ${state.token}`
                        },
                    })
                if (response.data) {
                    try {
                        const notesResponse = await dispatch('loadNotes');
                        if (notesResponse) {
                            commit('setNotes', notesResponse)
                            commit('setModalShow', {val: false, activeForm: 'newNoteForm'})
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (e) {
                console.log(e)
            }
        },
        async deleteNote({state, commit, dispatch}, noteId) {
            try {
                const response = await axios.delete(`https://dist.nd.ru/api/notes/${noteId}`,
                    {
                        headers: {
                            'accept' : 'application/json',
                            'authorization': `Bearer ${state.token}`
                        },
                    })
                if (response.status === 200) {
                    try {
                        const notesResponse = await dispatch('loadNotes');
                        if (notesResponse) {
                            commit('setNotes', notesResponse)
                            commit('setModalShow', {val: false, activeForm: 'newNoteForm'})
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
                console.log(response)
            } catch (e) {
                console.log(e)
            }
        }
    }
})

