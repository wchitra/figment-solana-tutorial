import type {NextApiRequest, NextApiResponse} from 'next';
import {TezosToolkit} from '@taquito/taquito';
import {getTezosUrl} from '@figment-tezos/lib';
import {importKey} from '@taquito/signer';
import {CONTRACT_JSON} from 'contracts/tezos/counter.js';

export default async function setter(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {mnemonic, email, password, secret, contract} = req.body;
    const url = getTezosUrl();
    const tezos = new TezosToolkit(url);
    await importKey(tezos, email, password, mnemonic, secret);

    const n = 1;
    // load the interface of the contract
    const counterContract = undefined;
    // call the increment function of the contract
    const transaction = await counterContract.methods.increment(n).send();

    // await for confirmation
    await transaction.confirmation(3);

    res.status(200).json(transaction.hash);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
