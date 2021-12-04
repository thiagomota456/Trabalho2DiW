let HttpRequest = new XMLHttpRequest()

btnSearch.addEventListener("click", async function(e){
    e.preventDefault();
    
    HttpRequest.onload = function(){

        let data = JSON.parse(this.responseText)
        console.log(data)

        let pesquisa = "";
        for(let i = 0; i < data.items.length; i++){
            pesquisa += `<a href="${data.items[i].html_url}" style="font-weight: bold;">${data.items[i].full_name}</a><br>
                         <p>${data.items[i].description}</p><br><br>`
        }

        document.getElementById("pesquisa").innerHTML = pesquisa;
    }

    let query = document.getElementById("searchInput").value

    HttpRequest.open('GET', 'https://api.github.com/search/repositories?q=' + query + '+in:repos');
    HttpRequest.send();
    

})

window.addEventListener("load", function() {
    CarregardadosDoPerfil();
})

function CarregardadosDoPerfil(){
    HttpRequest.onload = function(){
        let data = JSON.parse(this.responseText)
        
         
        let paerfilString =`<div class="col-12 col-md-3">
                                <a href="https://github.com/thiagomota456"><img src=${data.avatar_url} alt=""></a>
                            </div>

                            <div class="col-12 col-md-9">

                                <div class="row" id="textos-objetivos">
                                <a href="https://github.com/thiagomota456"><h1>${data.name}a</h1>
                                    <h2>login: ${data.login}</h2></a>

                                    <a href="https://github.com/thiagomota456"><p><span class="negrito">Bio: </span>${data.bio}</p></a>
                                </div>
                                
                                <div class="redesSociais">
                                    <h2>Redes Sociais</h2>
                                    <a href=${data.blog}><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                                </div>

                            </div>`

        document.getElementById("perfil").innerHTML = paerfilString;

        carregaMeusRepositorios()
    }
    HttpRequest.open('GET', 'https://api.github.com/users/thiagomota456');
    HttpRequest.send();
}


function carregaMeusRepositorios(){
    HttpRequest.onload = function(){

        let data = JSON.parse(this.responseText)
        //console.log(data)

        let CardRepositoryString = ""
        for(let i = 0; i < data.length; i++){
            CardRepositoryString +=`<div class="col-12 col-md-4 Repositorio-card">
                  
                                <div class="row">
                                <i class="fas fa-folder col-2"></i>
                                <a class=" col-10 linkDoRepositorio" href=${data[i].url}><p>${data[i].name}</p></a>
                                </div>

                                <p>${data[i].description}</p>
                                
                            </div>`
        }
         
        

        document.getElementById("meusRepositorios").innerHTML = CardRepositoryString;
    }
    HttpRequest.open('GET', 'https://api.github.com/users/thiagomota456/repos');
    HttpRequest.send();
}