import Vue from 'vue'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(VuetifyToast, {
	x: 'center',
	y: 'bottom',
	color: 'info',
	icon: 'mdi-information-outline',
	iconColor: '',
	classes: [
		'body-2'
	],
	timeout: 2000,
	dismissable: true,
	multiLine: false,
	vertical: false,
	queueable: true,
	showClose: true,
	closeText: '',
	closeIcon: 'mdi-close-circle-outline',
	closeColor: '',
	slot: [],
	shorts: {
		custom: {
			color: 'purple'
		}
	},
	property: '$toast'
})