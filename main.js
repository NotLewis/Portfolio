
// Progressive Enhancement (SW supported)

    if (navigator.serviceWorker) {
        // Register the SW
        navigator.serviceWorker.register('/sw.js').then((registration) => {
      
        }).catch(console.log);
      }


//Notification Support
if(window.Notification) {
function showNotification() {

    let notificationOpts = {
        body: 'A new blog post has been added. Check it out!',
        icon: '/favicon.png'
    }

    let n = new Notification('New blog posts!', notificationOpts);

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

