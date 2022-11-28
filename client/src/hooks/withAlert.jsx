import useAlert from "./useAlert";

export default function withAlert(Component) {
    function ComponentWithAlertProp(props) {
        let alert = useAlert();
        return (
            <Component
                {...props}
                alert={alert}
            />
        );
    }

    return ComponentWithAlertProp;
}