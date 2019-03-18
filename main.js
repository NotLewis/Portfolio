
//Progressive Enhancement (Makes sure services workers are supported by the browser)
// if ('serviceWorker' in navigator){}

// Progressive Enhancement (SW supported)
// if ('serviceWorker' in navigator) {
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





let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
  });


  btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });