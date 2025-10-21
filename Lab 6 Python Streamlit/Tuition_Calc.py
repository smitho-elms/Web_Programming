import streamlit as st

st.set_page_config(page_title="Tuition Net Calculator", page_icon="🎓")

st.title(" Tuition Net Calculator")

# --- Constants ---
BASE_TUITION = 42_540
FEES = 2_025
PELL_MAX = 7_395
MERIT_GPA_THRESHOLD = 3.5
MERIT_AMOUNT = 20_000
LOCAL_AMOUNT = 5_000

def currency(x: float) -> str:
    return f"${x:,.0f}"

st.subheader("Enter your info")
col1, col2 = st.columns(2)

with col1:
    gpa = st.number_input(
        "High school / transfer GPA (0.00–4.00)",
        min_value=0.0, max_value=4.0, value=3.2, step=0.01, format="%.2f"
    )
with col2:
    sai = st.number_input(
        "FAFSA SAI (Student Aid Index)",
        min_value=0, max_value=999_999, value=8_000, step=1
    )

is_local = st.checkbox("I am local to the area", value=False)

if st.button("Calculate Net Cost"):
    # Cost of attendance (tuition + fees)
    total_direct_cost = BASE_TUITION + FEES

    # Aid calculations
    merit = MERIT_AMOUNT if gpa >= MERIT_GPA_THRESHOLD else 0
    if merit > 0:
        st.balloons()

    pell = max(0, PELL_MAX - sai) if sai <= PELL_MAX else 0
    local_award = LOCAL_AMOUNT if is_local else 0

    total_aid = merit + pell + local_award
    net_cost = max(0, total_direct_cost - total_aid)

    st.markdown("### Cost & Aid Breakdown")
    st.write(
        f"- **Base tuition:** {currency(BASE_TUITION)}\n"
        f"- **Fees:** {currency(FEES)}\n"
        f"- **Total direct cost:** {currency(total_direct_cost)}\n\n"
        f"- **Merit scholarship ({'yes' if merit else 'no'}):** {currency(merit)}\n"
        f"- **Pell grant (if SAI ≤ {currency(PELL_MAX)}):** {currency(pell)}\n"
        f"- **Local scholarship ({'yes' if local_award else 'no'}):** {currency(local_award)}\n"
        f"- **Total aid:** {currency(total_aid)}"
    )

    st.success(f"**Estimated Net Cost: {currency(net_cost)}**")