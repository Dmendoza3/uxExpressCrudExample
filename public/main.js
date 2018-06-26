var update = document.getElementById('update')

update.addEventListener('click', ()=>{
    fetch('posts', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': 'Replaced',
          'quote': 'New Message'
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      }).
      then(data => {
        console.log(data)
        window.location.reload()
      })
})

var del = document.getElementById('delete')

del.addEventListener('click', () => {
    fetch('posts', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': 'Delete'
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      }).
      then(data => {
        console.log(data)
        window.location.reload()
      })
})