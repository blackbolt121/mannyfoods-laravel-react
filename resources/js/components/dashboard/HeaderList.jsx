const HeaderList = (props) => {

    return <>
        <div className={"dashboard__list"}>
            <div className={props.ClassName}>
                { props.headerItems.map(headerItem => <p key={headerItem}>{headerItem}</p>) }
            </div>
            <div>
                <p>

                </p>
            </div>
        </div>

    </>
}
HeaderList.defaultProps = {
    ClassName: "dashboard__list--header",
    headerItems: []
}
export default HeaderList;
