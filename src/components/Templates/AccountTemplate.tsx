import { AccountProps } from '../../models/AccountProps';
import cx from 'classnames';

export default function AccountTemplate({
  accountProps,
}: {
  accountProps: AccountProps[];
}) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="max-w-[400px] p-4 mx-4 text-center">
        <div
          className={cx(
            'max-w-[400px] p-4 mx-4 border-[2px] border-black text-center',
            'dark:border-white'
          )}
        >
          <h1 className="text-2xl">Account</h1>
        </div>
        {accountProps.map((account) => (
          <div className="p-4" key={account.id}>
            <h2>
              <strong>Username: </strong> {account.username}
            </h2>
            <h2>
              <strong>Email: </strong>
              {account.email}
            </h2>
            <h2>
              <strong>Name: </strong>
              {account.first_name} {account.last_name}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}
