import loans from '../../json-data/loans.json' assert { type: 'json' };

export const getAllLoans = (req, res) => {
  try {
    if (req.user.role === 'admin' || req.user.role === 'superAdmin') {
      res.status(200).json({ message: 'Loans fetched successfully', loans });
    } else if (req.user.role === 'staff') {
      const filteredLoans = loans.map(loan => {
        if (loan.applicant.role === 'admin' || loan.applicant.role === 'superAdmin') {
          return loan; 
        } else {
          const { applicant: { totalLoan, ...applicantWithoutTotalLoan }, ...rest } = loan;
          return { ...rest, applicant: { ...applicantWithoutTotalLoan } };
        }
      });
      res.status(200).json(filteredLoans);
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
};


export const getLoansByStatus = (req, res) => {
  try {
    const { status } = req.query;
    console.log('status', status)

    if (!status) {
      return res.status(400).json({ message: 'Status parameter is required' });
    }

    const filteredLoans = loans.filter(loan => loan.status === status);

    if (filteredLoans.length === 0) {
      return res.status(404).json({ message: 'No loans found with the specified status' });
    }

    res.status(200).json(filteredLoans);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
};


export const getLoansByUserEmail = (req, res) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res.status(400).json({ message: 'User email parameter is required' });
    }

    const userLoans = loans.filter(loan => loan.userEmail === userEmail);

    res.status(200).json({ loans: userLoans });
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
};

export const getExpiredLoans = (req, res) => {
  try {

    const currentDate = new Date();
    const expiredLoans = loans.filter(loan => new Date(loan.maturityDate) < currentDate);

    res.status(200).json(expiredLoans);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
};

export const deleteLoan = (req, res) => {
  try {
    const  loanId  = req.params.id

    if (req.user.role !== 'superAdmin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const loanIndex = loans.findIndex(loan => loan.id === loanId);
    console.log('loanId', loanId)
    console.log('loan', loanIndex)

    if (loanIndex === -1) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    loans.splice(loanIndex, 1);
    res.status(200).json({ message: 'Loan deleted successfully' });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ status: 'Error', message: 'Internal Server Error' });
  }
};




  