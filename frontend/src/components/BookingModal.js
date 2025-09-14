import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline, Close } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const BookingModal = ({ open, handleClose, event }) => {
  const [ticketCount, setTicketCount] = useState(1);
  const totalAmount = event.ticketPrice * ticketCount;

  const handleIncrement = () => {
    setTicketCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    setTicketCount(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bookingDetails = {
      eventName: event.title,
      tickets: ticketCount,
      totalAmount: totalAmount,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      paymentMethod: formData.get('paymentMethod'),
    };
    console.log('Booking Confirmed:', bookingDetails);
    alert('Booking successful! Check the console for details.');
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style} component="form" onSubmit={handleConfirmBooking}>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Close />
        </IconButton>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Book Tickets for {event.title}
        </Typography>

        {/* Ticket Counter */}
        <Box display="flex" alignItems="center" justifyContent="space-between" my={3}>
          <Typography variant="h6">Number of Tickets:</Typography>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleDecrement}><RemoveCircleOutline /></IconButton>
            <Typography variant="h6" sx={{ mx: 2 }}>{ticketCount}</Typography>
            <IconButton onClick={handleIncrement}><AddCircleOutline /></IconButton>
          </Box>
        </Box>

        {/* Total Amount */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'right', mb: 3 }}>
          Total Amount: ₹{totalAmount.toLocaleString()}
        </Typography>
        
        {/* User Details */}
        <TextField required fullWidth label="Full Name" name="name" sx={{ mb: 2 }} />
        <TextField required fullWidth label="Email Address" name="email" type="email" sx={{ mb: 2 }} />
        <TextField required fullWidth label="Phone Number" name="phone" type="tel" sx={{ mb: 3 }} />
        
        {/* Payment Method */}
        <FormControl component="fieldset">
          <FormLabel component="legend">Payment Method</FormLabel>
          <RadioGroup row name="paymentMethod" defaultValue="upi">
            <FormControlLabel value="upi" control={<Radio />} label="UPI" />
            <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
          </RadioGroup>
        </FormControl>

        <Button type="submit" fullWidth variant="contained" size="large" sx={{ mt: 3, py: 1.5 }}>
          Confirm Booking
        </Button>
      </Box>
    </Modal>
  );
};

export default BookingModal;