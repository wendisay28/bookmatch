/**
 * Wallet Connection Component
 * LATIN HACK - Polkadot Wallet Integration
 */

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  AccountBalanceWallet,
  Close,
  CheckCircle,
  ContentCopy,
  Link as LinkIcon,
  LinkOff
} from '@mui/icons-material';
import { useBlockchain } from '../../contexts/BlockchainContext';

interface WalletConnectProps {
  open: boolean;
  onClose: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ open, onClose }) => {
  const {
    isConnected,
    isConnecting,
    account,
    accounts,
    chainInfo,
    error,
    connect,
    disconnect,
    enableExtension,
    selectAccount
  } = useBlockchain();

  const [step, setStep] = useState<'connect' | 'select'>('connect');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleConnect = async () => {
    setLoading(true);
    setLocalError(null);

    try {
      // First connect to Paseo network
      await connect();

      // Then enable extension to get accounts
      const extensionAccounts = await enableExtension();

      if (extensionAccounts.length === 0) {
        setLocalError('No accounts found in extension');
        return;
      }

      // If only one account, select it automatically
      if (extensionAccounts.length === 1) {
        selectAccount(extensionAccounts[0]);
        onClose();
      } else {
        // Show account selection
        setStep('select');
      }
    } catch (err: any) {
      setLocalError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAccount = (selectedAccount: any) => {
    selectAccount(selectedAccount);
    onClose();
  };

  const handleDisconnect = async () => {
    await disconnect();
    setStep('connect');
    onClose();
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const renderConnectStep = () => (
    <>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={1}>
            <AccountBalanceWallet />
            <Typography variant="h6">Connect Wallet</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          {(error || localError) && (
            <Alert severity="error">
              {error || localError}
            </Alert>
          )}

          <Box
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            <AccountBalanceWallet sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Connect to Paseo Testnet
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Connect your Polkadot wallet to register books and verify ownership on the blockchain.
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mb={2}>
              Make sure you have Polkadot.js extension installed
            </Typography>
          </Box>

          <Alert severity="info" icon={<LinkIcon />}>
            <Typography variant="body2">
              <strong>Network:</strong> Paseo Testnet (Required for LATIN HACK)
            </Typography>
          </Alert>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConnect}
          disabled={loading || isConnecting}
          startIcon={loading || isConnecting ? <CircularProgress size={20} /> : <AccountBalanceWallet />}
        >
          {loading || isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </DialogActions>
    </>
  );

  const renderSelectAccountStep = () => (
    <>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Select Account</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body2" color="text.secondary">
            Choose which account to use with BookMatch
          </Typography>

          {chainInfo && (
            <Alert severity="success" icon={<CheckCircle />}>
              Connected to {chainInfo.name} - Block #{chainInfo.blockNumber}
            </Alert>
          )}

          <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
            {accounts.map((acc, index) => (
              <ListItem
                key={acc.address}
                disablePadding
                secondaryAction={
                  <Tooltip title="Copy address">
                    <IconButton edge="end" onClick={() => copyAddress(acc.address)}>
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Tooltip>
                }
              >
                <ListItemButton onClick={() => handleSelectAccount(acc)}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {acc.meta.name?.[0] || (index + 1)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={acc.meta.name || `Account ${index + 1}`}
                    secondary={formatAddress(acc.address)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={() => setStep('connect')}>
          Back
        </Button>
      </DialogActions>
    </>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {step === 'connect' ? renderConnectStep() : renderSelectAccountStep()}
    </Dialog>
  );
};

export const WalletButton: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { isConnected, account, disconnect } = useBlockchain();

  const handleClick = () => {
    if (isConnected) {
      // Show disconnect option or account info
      setDialogOpen(true);
    } else {
      setDialogOpen(true);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <Button
        variant={isConnected ? 'outlined' : 'contained'}
        color={isConnected ? 'success' : 'primary'}
        startIcon={isConnected ? <CheckCircle /> : <AccountBalanceWallet />}
        onClick={handleClick}
        sx={{ borderRadius: 2 }}
      >
        {isConnected && account
          ? formatAddress(account.address)
          : 'Connect Wallet'}
      </Button>

      {isConnected ? (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="xs" fullWidth>
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Wallet Connected</Typography>
              <IconButton onClick={() => setDialogOpen(false)} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box display="flex" flexDirection="column" gap={2} alignItems="center">
              <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56 }}>
                <CheckCircle />
              </Avatar>
              <Typography variant="body1" fontWeight="bold">
                {account?.meta.name || 'Account'}
              </Typography>
              <Chip
                label={account ? formatAddress(account.address) : ''}
                variant="outlined"
                icon={<ContentCopy fontSize="small" />}
                onClick={() => account && navigator.clipboard.writeText(account.address)}
              />
              <Alert severity="success" sx={{ width: '100%' }}>
                Connected to Paseo Testnet
              </Alert>
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LinkOff />}
              onClick={() => {
                disconnect();
                setDialogOpen(false);
              }}
              fullWidth
            >
              Disconnect
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <WalletConnect open={dialogOpen} onClose={() => setDialogOpen(false)} />
      )}
    </>
  );
};

export default WalletConnect;
