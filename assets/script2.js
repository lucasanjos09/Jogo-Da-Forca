
fetch('palavras.json')
    .then(response => response.json())
    .then(array => {

        const button = document.getElementById("tentar");
        const divPalavra = document.getElementById("palavra");
        const divDica = document.getElementById("dica");
        const divVida = document.getElementById("vidas");
        const divPalavraUsada = document.getElementById("letrasUsadas");
        const letrasUsadas = [];
        const letrasErradas = []
        const palavraAleatoria = array[Math.floor(Math.random() * array.length)]
        const convertWordRandom = palavraAleatoria.palavra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const palavraPronta = convertWordRandom.toUpperCase();
        let imagem = 0;
        let vidas = 6;
        let palavraOculta = "";
        
        for (let letra of palavraPronta) {
            if (letra != ' ' && letra != '-') {
                palavraOculta += "_"
            }

            else {
                palavraOculta += letra;
            }
        }

        divPalavra.innerHTML += palavraOculta;
        divDica.innerHTML += "Dica: " + palavraAleatoria["dica"];
        divVida.innerHTML += `Vidas Restantes: ${vidas}`;
        divPalavraUsada.innerHTML += "Letras erradas:"+ letrasErradas;

        button.addEventListener('click', () => {

            const input = document.getElementById("tentativa");
            const value = input.value.toUpperCase();
            const number = parseInt(value);
           
            if (!isNaN(number)) {
                alert("Somente letras ou palavras são permitidas!");
            } 
            
            else { 

                const tentativaUsuario = value.replace(/[^\w\s]/gi, '');
                console.log(tentativaUsuario);
               
                if (tentativaUsuario.length > 1) {
                    
                    if (tentativaUsuario == palavraPronta) {
                        
                        if (confirm(`Parabéns! Você acertou a palavra.\nPalavra certa: ${palavraPronta} \nDeseja jogar novamente?`)) {                            
                            location.reload()
                        }
                    } 
                    
                    else {
                        
                        if (confirm("Você perdeu!\nDeseja jogar novamente?")) {                            
                            location.reload()                            
                        }
                    }
                } 
                
                else {
                   
                    if (letrasUsadas.includes(tentativaUsuario)) {
                        alert("Letra já utilizada!");
                        return;

                    }

                    letrasUsadas.push(tentativaUsuario);

                    if (palavraPronta.includes(tentativaUsuario)) {
                        palavraOculta = palavraOculta.split("");                        
                        for (let i = 0; i < palavraOculta.length; i++) {                            
                            if (palavraPronta[i] == tentativaUsuario) {
                                palavraOculta[i] = tentativaUsuario;
                            }
                        }
                        palavraOculta = palavraOculta.join("");
                    } 
                    
                    else {
                        imagem++;
                        vidas--;
                        letrasErradas.push(tentativaUsuario)
                    }

                    document.getElementById("forca").src = "images/forca-" + imagem + ".jpg";

                    divPalavra.innerHTML = palavraOculta;
                    divVida.innerHTML = `Vidas Restantes: ${vidas}`;
                    divPalavraUsada.innerHTML = "Letras erradas:"+ letrasErradas;



                    if (vidas <= 0) {                       
                        document.getElementById("forca").src = "images/forca-" + imagem + ".jpg";
                        if (confirm("Você perdeu!\nDeseja jogar novamente?")) {
                            location.reload();
                        }
                    }

                    if (palavraOculta == palavraPronta) {
                        if (confirm(`Parabéns! Você acertou a palavra.\nPalavra certa: ${palavraPronta} \nDeseja jogar novamente?`)) {
                            location.reload();
                        }
                    }
                }
            }
        });
    })