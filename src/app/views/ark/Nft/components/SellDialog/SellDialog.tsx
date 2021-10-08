import { DialogContent, DialogProps } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DialogModal, FancyButton, Text } from "app/components";
import { getBlockchain, getWallet } from "app/saga/selectors";
import { actions } from "app/store";
import { RootState } from "app/store/types";
import { AppTheme } from "app/theme/types";
import { useAsyncTask } from "app/utils";
import BigNumber from "bignumber.js";
import cls from "classnames";
import { ArkClient } from "core/utilities";
import { fromBech32Address } from "core/zilswap";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { ZIL_HASH } from "zilswap-sdk/lib/constants";

interface Props extends Partial<DialogProps> {
}

const SellDialog: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { network } = useSelector(getBlockchain);
  const { wallet } = useSelector(getWallet);
  const match = useRouteMatch<{ id: string, collection: string }>();
  const [runConfirmSell, loading, error] = useAsyncTask("confirmSell");

  const open = useSelector<RootState, boolean>(state => state.layout.showSellNftDialog);

  const onClose = () => {
    dispatch(actions.Layout.toggleShowSellNftDialog("close"));
  };

  const onConfirm = () => {
    if (!wallet?.provider || !match.params?.collection || !match.params?.id) return;
    runConfirmSell(async () => {
      const { collection: address, id } = match.params
      const arkClient = new ArkClient(network);
      const msg = arkClient.arkMessage("Execute", arkClient.arkChequeHash({
        side: "Sell",
        token: { address, id, },
        price: { amount: new BigNumber(10000), address: ZIL_HASH },
        feeAmount: new BigNumber(250),
        expiry: 100,
        nonce: 0,
      }))

      const { signature, publicKey } = (await wallet.provider!.wallet.sign(msg as any)) as any

      const result = await arkClient.postTrade({
        publicKey,
        signature,

        collectionAddress: address,
        address: wallet.addressInfo.byte20.toLowerCase(),
        tokenId: id,
        side: "Sell",
        expiry: 100,
        nonce: 0,
        price: {
          amount: new BigNumber(10000),
          address: ZIL_HASH,
        },
      });

      console.log(result);
    });
  };

  return (
    <DialogModal header="Confirm Sell" onClose={onClose} {...rest} open={open} className={cls(classes.root, className)}>
      <DialogContent>
        {error && (
          <Text color="error">Error: {error?.message ?? "Unknown error"}</Text>
        )}
        <FancyButton walletRequired loading={loading} variant="contained" onClick={onConfirm}>
          Confirm Sell
        </FancyButton>
      </DialogContent>
    </DialogModal>
  );
};

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
  },
}));

export default SellDialog;
