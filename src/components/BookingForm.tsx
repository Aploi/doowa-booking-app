function BookingForm() {
  return (
    <form>
      <label>
        Court:
        <input type="text" placeholder="Court Name" />
      </label>
      <br />
      <label>
        Date:
        <input type="date" />
      </label>
      <br />
      <label>
        Time:
        <input type="time" />
      </label>
      <br />
      <button type="submit">Book</button>
    </form>
  );
}

export default BookingForm;