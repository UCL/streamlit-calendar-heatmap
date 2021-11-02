from pathlib import Path
import streamlit.components.v1 as components

_RELEASE = True

if not _RELEASE:
    _component_func = components.declare_component(
        # We give the component a simple, descriptive name ("my_component"
        # does not fit this bill, so please choose something better for your
        # own component :)
        "calendar_heatmap",
        # Pass `url` here to tell Streamlit that the component will be served
        # by the local dev server that you run via `npm run start`.
        # (This is useful while your component is in development.)
        url="http://172.17.162.220:3001",
    )
else:
    parent_dir = Path(__file__).parent
    build_dir = parent_dir / "frontend" / "build"
    _component_func = components.declare_component("calendar_heatmap", path=build_dir)


def calendar_heatmap(start_date,end_date,values, key=None):
    """Create a new instance of "calendar_heatmap".

    Parameters
    ----------
    start_date: str
        The start date for the calendar heatmap ("YYYY-MM-DD")
    end_date: str
        The end date for the calendar heatmap ("YYYY-MM-DD")
    values: list
        List of dictionaries containing date and optional count; e.g.:
        [{"date":"2021-05-10", "count":39}]
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.

    Returns
    -------
    dict
        Dictionary containing date string and optional count value for the selected date

    """
    component_value = _component_func(start_date=start_date,end_date=end_date,values=values, key=key, default=None)

    return component_value

if not _RELEASE:
    import streamlit as st

    st.subheader("Component with constant args")

    # Create an instance of our component with a constant `name` arg, and
    # print its output value.
    values = [
        {"date":"2021-03-29", "count":3},
        {"date":"2021-04-05", "count":9},
        {"date":"2021-04-12", "count":5},
        {"date":"2021-04-24", "count":12},
        {"date":"2021-05-10", "count":10},
        ]
    start_date = "2021-03-01"
    end_date = "2021-05-31"
    date_selected = calendar_heatmap(start_date,end_date,values)
    if date_selected:
        st.markdown("You selected %s" % date_selected["date"])
        st.markdown("Count is %s" % date_selected["count"])
