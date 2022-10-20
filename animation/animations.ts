export const pageTransition = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    exit: {
        opacity: 0
    },
}

export const productsFadeUp = {
    // initial: {
    //     y: 150,
    //     opacity: 0
    // },
    // animate: {
    //     y: 0,
    //     opacity: 1
    // }
    whileInView: {
        y: [150, 0],
        opacity: [0, 1],
        transition: {
            duration: 0.5,
        }
    }
}

export const stagger = {
    initial: {
        x: -200,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    },
}

export const fadeInRight = {
    initial: {
        x: -200,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
}
export const fadeButtons = {
    initial: {
        x: -200,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 0.6,
            duration: 0.5
        }
    },
}

export const fadeInUp = {
    initial: {
        y: 200,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5
        }
    },
}
