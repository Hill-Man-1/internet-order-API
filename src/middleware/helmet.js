import helmet from 'helmet'

const helmetApp = (app) => {
    app.use(helmet());
}

export default helmetApp