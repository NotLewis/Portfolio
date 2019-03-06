
//Progressive Enhancement (Makes sure services workers are supported by the browser)
// if ('serviceWorker' in navigator){}

if (navigator.serviceWorker){
    // Register the SW
    navigator.serviceWorker.register('/sw.js').then(function(registration){
        // if (registration.active) already exists
       registration.active.postMessage('Hello from main.js')
   }).catch(console.log);
}


//Notification Support
if(window.Notification) {


function showNotification() {

    let notificationOpts = {
        body: 'Some notification information',
        icon: '/favicon.png'
    }

    let n = new Notification('My new Notification.', notificationOpts);

    n.onClick = () => {
        console.log('Notification Clicked')
    }
}

    // Manage permissions from the user
    if (Notification.permission === 'granted') {
        showNotification()

    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission( (permission) => {
            
            if ( permission === 'granted') {
                showNotification()
            }
        })
    }
}