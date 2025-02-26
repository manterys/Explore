// Global
const page = document.querySelector('.page')

// Loader
const dkLoader = () => {
    const loader = document.querySelector('.loader');

    window.addEventListener('load', function () {
        loader.style.opacity = 0

        loader.addEventListener('transitionend', function () {
            page.classList.add('loaded')
            page.style.opacity = 1
            loader.style.display = 'none'
        });
    });
};
dkLoader();

// Animation
const dkAnimation = () => {
    const animT = document.querySelectorAll('.animation-top')

    window.addEventListener('scroll', anim)

    function anim() {
    const triggerBottom = window.innerHeight / 1.1
    
    animT.forEach(anim => {
        const animTop = anim.getBoundingClientRect().top

        if(animTop < triggerBottom) {
            anim.classList.add('show')
        } 
    })
    }
}
dkAnimation()

// Menu Button
const dkMenuBtn = () => {
    const menuBtn = document.getElementById('menu-btn')
    if(!menuBtn) return

    menuBtn.addEventListener('click', () => page.classList.toggle('menuActive'))

    const nav = document.querySelector('.nav')
    nav.querySelectorAll('.nav a').forEach(function(link) {
        link.addEventListener("click", function(e) {
            page.classList.remove('menuActive')
        })
    })
}
dkMenuBtn()

// Counter
const dkCounter = () => {
    const statistics = document.querySelector('.statistics')
    const startCount = document.querySelectorAll('.counter')

    // IntersectionObserver
    let CounterObserver = new IntersectionObserver(
        (entries, observer) => {
            let [entry] = entries;
            if (!entry.isIntersecting) return;
            
            startCount.forEach(counter => {
                counter.innerText = '0'
                
                const updateCounter = () => {
                    const target = +counter.getAttribute('data-target')
                    const count = +counter.innerText
                    
                    const increment = target / 100
                    
                    if(count < target) {
                        counter.innerText = `${Math.ceil(count + increment)}`
          setTimeout(updateCounter, 40)
        } else {
            counter.innerText = target
        }
    }
    
    updateCounter()
})

// observer.unobserve(statistics)
// observation is only one time
observer.unobserve(statistics)

},
{
    root: null,
    threshold: window.innerWidth > 768 ? 0.3 : 0.2,
}
)
    CounterObserver.observe(statistics)
}
dkCounter()

// Button Scroll Top
const dkBtnTop = () => {
    const pxShow = 600;
    const btnTop = document.querySelector(".btn-go-top")
    if (!btnTop) return
    if (window.scrollY >= pxShow) btnTop.classList.add("visible")
    window.addEventListener('scroll', function() {
        if (window.scrollY >= pxShow) {
            if(!btnTop.classList.contains('visible')) btnTop.classList.add("visible")
        } else {
            btnTop.classList.remove("visible")
        }
    });
}
dkBtnTop()

// Move to
const dkMoveTo = () => {
    const easeFunctions = {
        easeInQuad: function (t, b, c, d) {
            t /= d
        return c * t * t + b
    },
    easeOutQuad: function (t, b, c, d) {
        t /= d
        return -c * t* (t - 2) + b
    },
    easeInOutQuad: function (t, b, c, d) {
        t /= d/2
        if (t < 1) return c/2*t*t + b
        t--
        return -c/2 * (t*(t-2) - 1) + b
    },
    easeInOutCubic: function (t, b, c, d) {
        t /= d/2
        if (t < 1) return c/2*t*t*t + b
        t -= 2
        return c/2*(t*t*t + 2) + b
    }
    }

    const triggers = document.querySelectorAll('.smoothscroll')

    const moveTo = new MoveTo({
        tolerance: 200,
        duration: 1200,
        easing: 'easeInOutCubic',
        container: window
    }, easeFunctions)

    triggers.forEach(function(trigger) {
        moveTo.registerTrigger(trigger)
    })
}
dkMoveTo()