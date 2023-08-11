import SplitType from 'split-type';
import { gsap } from 'gsap';

function Animation(id,direction) {
    let dirData={'y':'translate-y-full','x':'translate-x-full','-x':'-translate-x-full','-y':'-translate-y-full'}
    let text = new SplitType(`${id}`);
    let characters = document.querySelectorAll('.char');
    for (let i = 0; i < characters.length; i++) {
        characters[i].classList.add(dirData[direction]);              
    }
    direction === 'y'?
    gsap.to('.char', {
        y: 0,
        stagger: 0.05,
        delay: 0.02,
        duration: 0.5

    }) :
    gsap.to('.char', {
        x:0,
        stagger: 0.05,
        delay: 0.02,
        duration: 0.5

    });
    
}

export default Animation;